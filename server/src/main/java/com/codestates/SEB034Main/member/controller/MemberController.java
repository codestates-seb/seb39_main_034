package com.codestates.SEB034Main.member.controller;

import com.codestates.SEB034Main.config.JwtTokenizer;
import com.codestates.SEB034Main.feed.entity.Feed;
import com.codestates.SEB034Main.feed.service.FeedService;
import com.codestates.SEB034Main.member.dto.PostMemberDto;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;
    private final FeedService feedService;

    @PostMapping("/member")
    public ResponseEntity signupMember(@RequestBody PostMemberDto postMemberDto) {

        Member signedUpMember = memberService.creteMember(postMemberDto);
        Long memberId = signedUpMember.getMemberId();

        return new ResponseEntity(memberId, HttpStatus.CREATED);
    }

    @GetMapping("/member/{username}")
    public ResponseEntity getMemberContents(@PathVariable("username") String username) {

        Member verifiedMemberById = memberService.findVerifiedMember(username);

        return new ResponseEntity<>(verifiedMemberById, HttpStatus.OK);
    }

    @GetMapping("/members/{username}/feed")
    public ResponseEntity getMemberFeed(@PathVariable("username") String username) {

        Member verifiedMember = memberService.findVerifiedMember(username);
        List<Feed> feedsByMember = feedService.findFeedsByMember(verifiedMember);

        return new ResponseEntity<>(feedsByMember, HttpStatus.OK);
    }

    @GetMapping("/users/info")
    public ResponseEntity getMemberInfo(HttpServletRequest request) {

        String jws = request.getHeader("Access").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        Map<String, String> result = jwtTokenizer.verifyAccessSignature(jws, base64EncodedSecretKey);

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/users/validation")
    public ResponseEntity refreshTokenValidation(HttpServletRequest request, HttpServletResponse response) {

        String jws = request.getHeader("Refresh").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        Map<String, String> result = jwtTokenizer.verifyRefreshSignature(jws, base64EncodedSecretKey);

        String accessToken = result.get("newAccessToken");
        String refreshToken = result.get("newRefreshToken");

        response.addHeader("New_Authorization", "Bearer " + accessToken);
        response.addHeader("New_Refresh", refreshToken);

        if (result.get("newAccessToken") != null) {
            result.clear();
            result.put("token_status", "RE_ISSUED");
        }

        return new ResponseEntity(result, HttpStatus.OK);
    }
}
