package com.tfeo.backend.domain.home.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name="host_personality")
public class HostPersonality {
	@Id
	@Column(name = "host_personality_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hostPersonalityNo;

	private Boolean kind;
	private Boolean smoke;
	private Boolean pet;
	private Boolean clean;
	private Boolean extrovert;
	private Boolean sense;
	private Boolean thought;
	private Boolean judgment;
	private Boolean daytime;
	private Boolean nighttime;

}
