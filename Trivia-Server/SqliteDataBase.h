#pragma once
#include "IDatabase.h"
#include <string>
#include <iostream>
#include "sqlite3.h"
#include <io.h>
#include <vector>

class SqliteDataBase : public IDatabase
{
public:
    void operator=(const SqliteDataBase&) = delete;

    // Public static function to get the singleton instance
    static SqliteDataBase& getInstance() {
        static SqliteDataBase instance;
        return instance;
    }

    bool open() override;
    void close() override;
    void clear() override;
    bool doesUserExist(const std::string& username) override;
    bool isPasswordValid(const std::string& username, const std::string& password) override;
    void insertUserIntoDB(const std::string& username, const std::string& password, const std::string& email) override;
    int getNumOfPlayerGames(const std::string username) override;
    int getNumOfTotalAnswers(const std::string username) override;
    int getNumOfCorrectAnswers(const std::string username) override;
    double getPlayerAverageAnswerTime(const std::string username) override;
    std::vector<std::string> getTopUserGrades() const override;
    std::vector<std::string> getQuestions(const int amount) const override;
    std::vector<std::string> getPossibleAnswers(const std::string& title) const override;
    int getAnswerIdByTitle(const std::string& title) const override;


private:
    sqlite3* db;
    // Private constructor to prevent instantiation from outside
    SqliteDataBase() { open(); }

    // Private copy constructor to prevent cloning
    SqliteDataBase(const SqliteDataBase&);
};
