package com.codestates.SEB034Main.member.controller;

import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.member.dto.PostMemberDto;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/member")
    public ResponseEntity signupMember(@RequestBody PostMemberDto postMemberDto) {

        Member signedUpMember = memberService.creteMember(postMemberDto);
        Long memberId = signedUpMember.getMemberId();

        return new ResponseEntity(memberId, HttpStatus.CREATED);
    }
}
