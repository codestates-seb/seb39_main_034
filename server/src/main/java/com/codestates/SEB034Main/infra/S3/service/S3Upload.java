package com.codestates.SEB034Main.infra.S3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.image.repository.ImageRepository;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import com.codestates.SEB034Main.timeline.repository.TimelineRepository;
import com.codestates.SEB034Main.timeline.service.TimelineService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3Upload {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final ImageRepository imageRepository;
    private final TimelineService timelineService;
    private final TimelineRepository timelineRepository;


    public Image upload(MultipartFile multipartFile) throws IOException {
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);
        String imageURL = amazonS3.getUrl(bucket, s3FileName).toString();

        Image image = Image.builder()
                .url(imageURL)
                .filename(multipartFile.getOriginalFilename())
                .build();
        Image savedImage = imageRepository.save(image);

        return savedImage;
    }

    public void delete(long imageId) {
        Image verifiedImage = findVerifiedImage(imageId);
        String url = verifiedImage.getUrl();

        int index = url.indexOf(".com");
        String imageUrl = url.substring(index+5);

        amazonS3.deleteObject(bucket, imageUrl);
        imageRepository.delete(verifiedImage);
    }

    public void deleteUploadedImage(long timelineId) {
        Timeline verifiedTimeline = timelineService.findVerifiedTimeline(timelineId);
        Image uploadedImage = verifiedTimeline.getImage();

        verifiedTimeline.setImage(null);

        timelineRepository.save(verifiedTimeline);

        String url = uploadedImage.getUrl();

        int index = url.indexOf(".com");
        String imageUrl = url.substring(index+5);

        amazonS3.deleteObject(bucket, imageUrl);
        imageRepository.delete(uploadedImage);
    }


    @Transactional(readOnly = true)
    public Image findVerifiedImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        Image image =
                optionalImage.orElseThrow(()-> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));

        return image;
    }
}
