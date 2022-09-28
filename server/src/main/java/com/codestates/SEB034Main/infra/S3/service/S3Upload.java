/*
package com.codestates.SEB034Main.infra.S3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3Upload {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final ImageRepository imageRepository;


    public Image upload(MultipartFile multipartFile) throws IOException {
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);
        String imageURL = amazonS3.getUrl(bucket, s3FileName).toString();

        Image image = Image.builder()
                .url(imageURL)
                .build();
        Image savedImage = imageRepository.save(image);

        return savedImage;
    }

    public void delete() {
        String s3FileName = "35c51cdb-56df-416b-9e48-ca50dd94543a-codestates.png";
        amazonS3.deleteObject(bucket, s3FileName);
    }
}
*/
