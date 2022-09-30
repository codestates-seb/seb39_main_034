package com.codestates.SEB034Main.config;

import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.repository.MemberRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Component
public class JwtTokenizer {

    private MemberRepository memberRepository;

    public JwtTokenizer(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims, String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(Map<String, Object> claims, String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public Map<String, String> verifyAccessSignature(String jws, String base64EncodedSecretKey) {
        Map<String, String> checkResult = new HashMap<>();
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jws);

            Claims body = claims.getBody();
            String username = (String) body.get("username");
            checkResult.put("token_status", "VALID");
            checkResult.put("username", username);

        } catch (ExpiredJwtException ee) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        } catch (SignatureException se) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        } catch (MalformedJwtException me) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        } catch (UnsupportedJwtException ue) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        }
        return checkResult;
    }

    public Map<String, String> verifyRefreshSignature(String jws, String base64EncodedSecretKey) {
        Map<String, String> checkResult = new HashMap<>();
        Map<String, Object> newAccessClaims = new HashMap<>();
        Map<String, Object> newRefreshClaims = new HashMap<>();
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jws);

            Claims body = claims.getBody();
            String username = (String) body.get("username");

            Optional<Member> optionalMember = memberRepository.findByUsername(username);
            Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            String subject = findMember.getEmail();

            newAccessClaims.put("username", findMember.getUsername());
            newAccessClaims.put("roles", findMember.getRole().toString());
            newRefreshClaims.put("username", findMember.getUsername());
            Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());
            String newBase64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

            String newAccessToken = generateAccessToken(newAccessClaims, subject, expiration, newBase64EncodedSecretKey);
            String newRefreshToken = generateRefreshToken(newRefreshClaims, subject, expiration, newBase64EncodedSecretKey);

            checkResult.put("newAccessToken", newAccessToken);
            checkResult.put("newRefreshToken", newRefreshToken);

        } catch (ExpiredJwtException ee) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        } catch (SignatureException se) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        } catch (MalformedJwtException me) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        } catch (UnsupportedJwtException ue) {
            checkResult.put("token_status", "NOT_VALID_TOKEN");
        }
        return checkResult;
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }
}
