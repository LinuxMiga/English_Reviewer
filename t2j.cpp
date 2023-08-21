#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

int main() {
    std::ifstream inputFile("E.txt");
    if (!inputFile.is_open()) {
        std::cerr << "Failed to open input file." << std::endl;
        return 1;
    }

    json jsonArray = json::array();

    std::string line;
    while (std::getline(inputFile, line)) {
        size_t pos = line.find(' ');
        if (pos == std::string::npos) {
            std::cerr << "Invalid line format: " << line << std::endl;
            continue;
        }

        std::string word = line.substr(0, pos);
        std::string meaning = line.substr(pos + 1);

        json entry = {
            {"word", word},
            {"meaning", meaning}
        };

        jsonArray.push_back(entry);
    }

    inputFile.close();

    std::ofstream outputFile("output.json");
    if (!outputFile.is_open()) {
        std::cerr << "Failed to open output file." << std::endl;
        return 1;
    }

    outputFile << jsonArray.dump(4); 

    outputFile.close();

    std::cout << "JSON data has been written to output.json" << std::endl;

    return 0;
}

