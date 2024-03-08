package com.tfeo.backend.domain.member.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.review.model.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "member")
public class Member {
	@Id
	@Column(name = "member_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberNo;

	private String id;

	private String name;

	private String password;

	private String phone;

	private String email;

	@Column(name = "register_no")
	private String registerNo;

	private String college;

	private String address;

	@Column(name = "profile_url")
	private String profileUrl;

	private GenderType gender;

	private MemberRoleType role;

	private String certificate;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="member_personality_no")
	private MemberPersonality memberPersonality;

	@Column(name = "certificate_status")
	private CertificateStatusType certificateStatus;

	@Column(name = "certificate_register_date")
	private String certificateRegisterDate;

	@Column(name = "certificate_expiration_date")
	private String certificateExpirationDate;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Wish> wishes;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Contract> contracts;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Review> reviews;

}
