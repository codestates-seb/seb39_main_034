package com.codestates.SEB034Main.infra.S3.controller;

import com.codestates.SEB034Main.infra.S3.service.S3Upload;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RequiredArgsConstructor
@RestController
public class S3Controller {

    private final S3Upload s3Upload;

    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("images") MultipartFile multipartFile) throws IOException {

        return new ResponseEntity(s3Upload.upload(multipartFile), HttpStatus.OK);
    }
}
