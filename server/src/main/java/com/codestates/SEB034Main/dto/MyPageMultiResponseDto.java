package com.codestates.SEB034Main.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MyPageMultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;
    private MyPageInfo myPageInfo;

    public MyPageMultiResponseDto(List<T> data, Page page, MyPageInfo myPageInfo) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
        this.myPageInfo = myPageInfo;
    }
}
