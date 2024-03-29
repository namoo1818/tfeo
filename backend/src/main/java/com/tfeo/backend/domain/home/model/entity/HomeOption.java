package com.tfeo.backend.domain.home.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tfeo.backend.common.model.type.BuildingType;
import com.tfeo.backend.domain.home.model.dto.HomeOptionDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "home_option")
public class HomeOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeOptionNo;

	private int internet;

	private int gas;

	private int washingMachine;

	private int airConditioner;

	private int refrigerator;

	private int elevator;

	private int microwave;

	private int breakfast;

	private int toilet;

	private int heating;

	private int parking;

	private int station;

	private int moveInDate;

	private int sink;

	private BuildingType type;

	public void update(HomeOptionDto homeOptionDto) {
		this.internet = homeOptionDto.getInternet();

		this.gas = homeOptionDto.getGas();

		this.washingMachine = homeOptionDto.getWashingMachine();

		this.airConditioner = homeOptionDto.getAirConditioner();

		this.refrigerator = homeOptionDto.getRefrigerator();

		this.elevator = homeOptionDto.getElevator();

		this.microwave = homeOptionDto.getMicrowave();

		this.breakfast = homeOptionDto.getBreakfast();

		this.toilet = homeOptionDto.getToilet();

		this.heating = homeOptionDto.getHeating();

		this.parking = homeOptionDto.getParking();

		this.station = homeOptionDto.getStation();

		this.moveInDate = homeOptionDto.getMoveInDate();

		this.sink = homeOptionDto.getSink();

		this.type = homeOptionDto.getType();
	}
}
