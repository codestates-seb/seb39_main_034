package com.codestates.SEB034Main.timeline.dto;

import com.codestates.SEB034Main.image.entity.Image;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PatchTimelineDto {

    private String description;

    private long imageId;
}
