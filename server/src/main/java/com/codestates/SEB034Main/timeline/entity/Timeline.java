package com.codestates.SEB034Main.timeline.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Timeline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timelineId;
}
