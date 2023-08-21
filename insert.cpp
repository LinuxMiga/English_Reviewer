#include <iostream>
#include <fstream>
#include <sstream>

int main() {
    // ��ȡ output.json ������
    std::ifstream jsonFile("output.json");
    if (!jsonFile.is_open()) {
        std::cerr << "Error opening output.json" << std::endl;
        return 1;
    }

    std::stringstream jsonContentStream;
    jsonContentStream << jsonFile.rdbuf();
    std::string jsonContent = jsonContentStream.str();
    jsonFile.close();

    // ��ȡ index.js ������
    std::ifstream jsFile("index.js");
    if (!jsFile.is_open()) {
        std::cerr << "Error opening index.js" << std::endl;
        return 1;
    }

    std::stringstream jsContentStream;
    jsContentStream << jsFile.rdbuf();
    std::string jsContent = jsContentStream.str();
    jsFile.close();

    // ���� jsonData ����
    size_t jsonDataStart = jsContent.find("let jsonData = [");
    if (jsonDataStart == std::string::npos) {
        std::cerr << "Error: jsonData not found in index.js" << std::endl;
        return 1;
    }

    size_t jsonDataEnd = jsContent.find("];", jsonDataStart);
    if (jsonDataEnd == std::string::npos) {
        std::cerr << "Error: jsonData end not found in index.js" << std::endl;
        return 1;
    }

    // ���� index.js ������
    std::string updatedJsContent = jsContent.substr(0, jsonDataStart + 15) + jsonContent + jsContent.substr(jsonDataEnd);

    // д�ظ��º�����ݵ� index.js
    std::ofstream updatedJsFile("index.js");
    if (!updatedJsFile.is_open()) {
        std::cerr << "Error opening index.js for writing" << std::endl;
        return 1;
    }

    updatedJsFile << updatedJsContent;
    updatedJsFile.close();

    std::cout << "jsonData has been updated in index.js" << std::endl;

    return 0;
}

