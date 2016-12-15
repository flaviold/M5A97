#pragma once

#include <errno.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <unistd.h>
#include <opencv/cv.h>
#include <opencv/highgui.h>

#include <string>
#include <sys/un.h>

using namespace std;

class WebAdapter {
public:
    WebAdapter(int port);
    ~WebAdapter();

    void create();
    void createUnix();
    string readWait();
    string readNoWait();
    void sendResponse(cv::Mat);
    void ParseCommands(string, void (*)(string, bool));

private:
    void close_socket();
    void handle(int);
    //string serialize(cv::Mat);

    int port_;
    int server_;
    int buflen_;
    char* buf_;
    string unix_socket_name_;
    struct sockaddr_in serv_addr;
    struct sockaddr_un unix_serv_addr;
};
