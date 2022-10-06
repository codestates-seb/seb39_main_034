package com.codestates.SEB034Main.member.service;

import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.member.dto.PostMemberDto;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public Member creteMember(PostMemberDto postMemberDto) {

        if (!postMemberDto.getPassword().equals(postMemberDto.getRePassword())) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        } else {
            Member member = Member.builder()
                    .username(postMemberDto.getUsername())
                    .email(postMemberDto.getEmail())
                    .password(passwordEncoder.encode(postMemberDto.getPassword()))
                    .build();

            return memberRepository.save(member);
        }
    }

    public Member findMember(long userId) {
        Member verifiedMemberById = findVerifiedMemberById(userId);

        return verifiedMemberById;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(String username) {
        Optional<Member> byUsername = memberRepository.findByUsername(username);
        Member findMember =
                byUsername.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMemberById(long memberId) {
        Optional<Member> byMemberId = memberRepository.findById(memberId);
        Member findMember =
                byMemberId.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}
