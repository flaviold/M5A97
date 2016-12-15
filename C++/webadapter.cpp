#include "webadapter.h"
#include "base64.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <iostream>
#include <string>
#include <sstream>

WebAdapter::WebAdapter(int port) {
    // setup variables
    port_ = port;
    buflen_ = 1024;
    stringstream ss;
	ss << port;
    unix_socket_name_ = "/tmp/snes-socket-" + ss.str() + ".socket";
    buf_ = new char[buflen_+1];
}

WebAdapter::~WebAdapter() {
    delete buf_;
}

void WebAdapter::createUnix() {
	printf("%s\n", unix_socket_name_.c_str());
	bzero(&unix_serv_addr,sizeof(unix_serv_addr));
	unix_serv_addr.sun_family = PF_UNIX;
	strncpy(unix_serv_addr.sun_path,unix_socket_name_.c_str(),sizeof(unix_serv_addr.sun_path) - 1);

	server_ = socket(PF_UNIX,SOCK_STREAM,0);
	if (!server_) {
		perror("socket");
		exit(-1);
	}

	while (connect(server_,(struct sockaddr *) &unix_serv_addr,sizeof(unix_serv_addr)) < 0) {
		perror("connecting");
	}
}

void WebAdapter::create() {
	int sockfd, portno, n;
		struct hostent *server;

		portno = port_;
		sockfd = socket(AF_INET, SOCK_STREAM, 0);
		if (sockfd < 0) {
			fprintf(stderr, "ERROR opening socket\n");
			exit(0);
		}
		server = gethostbyname("localhost");
		if (server == NULL) {
			fprintf(stderr,"ERROR, no such host\n");
			exit(0);
		}
		bzero((char *) &serv_addr, sizeof(serv_addr));
		serv_addr.sin_family = AF_INET;
		bcopy((char *)server->h_addr,
			 (char *)&serv_addr.sin_addr.s_addr,
			 server->h_length);
		serv_addr.sin_port = htons(portno);
		server_ = sockfd;

		while (n = connect(server_,(struct sockaddr *) &serv_addr,sizeof(serv_addr))){
			if (n >= 0) break;
		}
}

string WebAdapter::readWait() {
	while (read(server_,buf_,buflen_) <= 0);
	return buf_;
}

string WebAdapter::readNoWait() {
	if (read(server_,buf_,buflen_) <= 0) {
		return "";
	}
	return buf_;
}

void WebAdapter::sendResponse(cv::Mat imgMat) {
	vector<uchar> buf;
	cv::imencode(".png", imgMat, buf);
	uchar *response = new uchar[buf.size()];
	for(int i=0; i < buf.size(); i++) response[i] = buf[i];
	string encoded = base64_encode(response, buf.size());
	write(server_,encoded.c_str(),encoded.size());
}

void WebAdapter::ParseCommands(string commandStr, void (*ForEveryCommand)(string, bool)) {
	if (commandStr.length() == 0) return;

	string commandSub = commandStr.substr(1,59);
	stringstream ss(commandSub); // Turn the string into a stream.
	string tok;

	while (getline(ss, tok, ';')) {
		vector<string> commandAndValue;
		stringstream ss2(tok);
		string part;

		while (getline(ss2, part, ':')) {
			commandAndValue.push_back(part);
		}

		ForEveryCommand(commandAndValue[0], (bool) atoi(commandAndValue[1].c_str()));
	}
}

void WebAdapter::close_socket() {
    close(server_);
}


