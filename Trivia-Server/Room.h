#pragma once
#include "LoggedUser.h"
#include "RoomData.h"
#include <vector>
#include <mutex>
#include "GameManager.h"

class Room
{
public:
	Room(const LoggedUser& user, const RoomData& metadata) : m_metadata(metadata), m_admin(user) {};
	Room(Room&& other) noexcept
		: m_metadata(std::move(other.m_metadata)),
		m_users(std::move(other.m_users)),
		m_admin(std::move(other.m_admin))
	{
	}

	Room() = delete;
	void addUser(const LoggedUser& user);
	void removeUser(const LoggedUser& user);
	const std::vector<LoggedUser>& getAllUsers() const;
	const unsigned int getRoomState() const;
	void startGame();
	RoomData getRoomData() const;
	bool isUserInRoom(const LoggedUser& user) const;
	LoggedUser getAdmin() const;
private:
	RoomData m_metadata;
	std::vector<LoggedUser> m_users;
	std::mutex users_mutex;
	LoggedUser m_admin;
};

