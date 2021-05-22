package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="items")
public class Item {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="name")
	private String name;
	@Column(name="category")
	private String category;
	@Column(name="image_url")
	private String image_url;
	@Column(name="cost")
	private int cost;
	@Column(name="discount")
	private int discount;
	@Column(name="latest")
	private String latest;
	@Column(name="type")
	private String type;
	public Item() {
		
	}
	
	
	public Item(long id, String name, String category, String image_url, int cost, int discount, String latest, String type) {
		super();
		this.id = id;
		this.name = name;
		this.category = category;
		this.image_url = image_url;
		this.cost = cost;
		this.discount = discount;
		this.latest = latest;
		this.type=type;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImage_url() {
		return image_url;
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}


	public String getLatest() {
		return latest;
	}


	public void setLatest(String latest) {
		this.latest = latest;
	}

	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}

	

	
}
