package com.codestates.SEB034Main.infra.S3.controller;

import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.infra.S3.service.S3Upload;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
public class S3Controller {

    private final S3Upload s3Upload;

    @Secured("ROLE_USER")
    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        Image uploadedImage = s3Upload.upload(multipartFile);

        return new ResponseEntity(uploadedImage, HttpStatus.CREATED);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/delete")
    public ResponseEntity deleteFile(@RequestParam("imageId") long imageId) {

        s3Upload.delete(imageId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/delete/timelineImage")
    public ResponseEntity deleteUploadedFile(@RequestParam("timelineId") long timelineId) {

        s3Upload.deleteUploadedImage(timelineId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
