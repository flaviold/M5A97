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

#include <sys/un.h>

std::string img1 = "iVBORw0KGgoAAAANSUhEUgAAAQAAAADgCAYAAADsQbhQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHABgq2xc1FQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMkSURBVHja7dwvbsIAFMDhx5gAg5gAsSWYznAADoAfB8BvhwLfA1APngOgakgm1gnEDHNMLZnaH5Z1Lf0+TZ94SX9tGtpWu308BtBIF1YAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIAPDRpRU002TyGOPxcyTJS1xdvUZExH7fiTzvxWbTj9XqxpIaoNVuH4/W0KwTfzbLYzA4fPq7p6dupOltrNfXliYAnIOHh23c3e1+dMxyOYzFYmR5ngHQtJM/ImI63cX9/dYCBYA63/afcvJ/jMBk8miRAkAdzWZ5JWYgAPzD1f+rB37fMRgc3AUIAHUzHj9XchYCQAmS5KWSsxAASvD+J5+qzUIAAAHgL+33nUrOQgAoQZ73KjkLAaAEm02/krMQAEqwWt1EUXR/Pacout4QFADqKE2TSsxAAPinu4AsG558fJYNXf0FgDqbz0cnRSDLhjGfex34XPkeQMN894MgRdGNNE1c+QWAcw2BT4IhAOAZACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgACYAUgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIAlO8ND9d51+5mrxoAAAAASUVORK5CYII=";
std::string img2 = "iVBORw0KGgoAAAANSUhEUgAAAQAAAADgCAYAAADsQbhQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHABg1Vh844AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMLSURBVHja7dytjcJwGMDhl+MEGAQCDAmmigEYAM8CDMBQDMAC9QzQAVA1JJgiEBjOceqSU/fB5cq/9Hk0fcWb9Nemoe10u7dbAK30YgUgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAIACAAQPu8WkE7LRbHmM9PkWWXGA7fIiLifO5FWQ6iKEax200sqQU63e7tZg3tOvFXqzLG4+uXv6uqfmy3mRAIAM9ivd7Hcnn41TF5Po3NZmZ5ngHQtpM/ImK5PMR6vbdAAaDJt/33nPyfI7BYHC1SAGii1apMYgYCwAOu/t898PuJ8fjqLkAAaJr5/JTkLASAGmTZJclZCAA1+PiTT2qzEABAAPhP53MvyVkIADUoy0GSsxAAalAUoyRnIQDUYLebRFX1/zynqvpeDBIAmmi7zZKYgQDwoLuAPJ/efXyeT139BYAm22xmd0XA68DPzfcAWsYHQRAAfBIMAQDPAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABABI0Dv7RHnVTJsLTwAAAABJRU5ErkJggg==";
std::string img3 = "iVBORw0KGgoAAAANSUhEUgAAAQAAAADgCAYAAADsQbhQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHABkG8NRotwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAM/SURBVHja7dw9buIAEIDR8ZIiNCkSKVBEonGVA7gO7n0B98mhOAAXcM8BOECauEGCwomElBT5qUixSrtawYq18Xs1nmIkPoxlOxkMdrsAeumXFYAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIANAlZ1bQT3m+jix7iTR9jcvLz4iI2G7Po64vYrm8jsXixpJ6IBkMdjtr6I/pdBNl+RTj8ccfP9c0w5jPUyEQAE7F/f1jFMUqkuTvj6mqScxmt5bnGgB9+/JHRBTFKh4eHi1QAOiqu7tNFMVq7+OLYhV5vrZIAaCLyrL+/X8vOXwGAkCHTKebGI/fD/ryR0SMRh/OAgSArsmy51bOQgA4gjR9/Yez3ixUAOiSq6uvg0//f/zcMIQA0Blu80AAemu7PW/lLASAI6jri1bOQgA4guXyupWzEACOYLG4iaYZHjynaYYeDBIAumg+T1sxAwHgP50FVNVk7+OrauLXXwDostnsdq8IeBz4tHkfQM/k+TrKso7RyAtBEIBehyDLniNN37wSTAAA1wAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEAATACkAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEAAQAEAAAAEABAAQAEAAAAEATso30EZ62XTKTFMAAAAASUVORK5CYII=";
std::string img4 = "iVBORw0KGgoAAAANSUhEUgAAAQAAAADgCAYAAADsQbhQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHABkS6g68ygAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMMSURBVHja7dyvjcIAFMDhx3ECDAIBhgRTxQAdAM8CHYChGIAF6hmAAVA1JJgiKjCc49Qlp+4Plyst/T5Nn3hJf20a2l6/f7sF0EkvVgACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAEBExKsVdNNyeYo0PUeSXGI8fouIiKoaRFGMYr+fxG43s6QO6PX7t5s1dOvEz7IiptPrl78ry2Fst4kQCADPYr0+xGp1/NUxeT6PzWZheZ4B0LWTPyJitTrGen2wQAGgzbf995z8nyOwXJ4sUgBooywrGjEDAeABV//vHvj9xHR6dRcgALRNmp4bOQsBoAZJcmnkLASAGnz8yadpsxAAQAD4T1U1aOQsBIAaFMWokbMQAGqw308aOQsBoAa73SzKcvjnOWU59GKQANBG223SiBkIAA+6C8jz+d3H5/nc1V8AaLPNZnFXBLwO/Nx8D6BjfBAEAcAnwRAA8AwAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEADgwd4Blw551U4ioOwAAAAASUVORK5CYII=";
std::string img5 = "iVBORw0KGgoAAAANSUhEUgAAAQAAAADgCAYAAADsQbhQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHABkcDbaRzQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAOESURBVHja7dy/SxtxGMDh18YGaWwgVKg/kKIItYJ7wCVzBuesCoH8SUrAObND5ixCdkEsiFJEVFACqSmSWtI/oBRqhOudeZ757h1euA/hwn2ncrnRKICJ9MYKQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAgD9MW8Hkqla/Rbl8G6ur/Zid/RkPD2/j/LwY3e7HaLc/WdAEmMrlRiNrmCzl8k3s7n6NhYUff73m+vpdHBx8jm533sIEgNdie/si6vXTf76+2VyPw8MVi/MOgKyrVK6e9fBHRNTrp1GpXFmeAJBlpdJjNBonY93baJxEqfRoiQJAVtVqZ1EoPI11b6HwFLXamSUKAFlULA6jWr180Yxq9TKKxaFlCgBZs7V1k6o5CAAJ2ty8T9UcBIAErax8T9UcBIAEzc09pmoOAkCC8vlfqZqDAJCg4TCXqjkIAAm6u5tJ1RwEgARdXLxP1RwEgAQdH39I1RwEgAQdHc2nag4CQIL6/Xy028vxkg+/2+3l6PfzlikAZFGrtRaDwXgHQA0G09FqrVmiAJBVvd5M7O9vjPUrYG9vI3o9/wAIAJnW6SxFs/nlWRFoNtej01myvFfKkWATqFy+jZ2d01hcdCagAAjAxHIqMAIA3gEAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAIABWAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgD8f78BxUqR0r3fQt0AAAAASUVORK5CYII=";
std::string img6 = "iVBORw0KGgoAAAANSUhEUgAAAQAAAADgCAYAAADsQbhQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHABoC3JT/bQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAPMSURBVHja7d0xS1thFIDhE2OQKi01YhVaqIiiQwRBHFydXUUQ8ceJCJLVVdcMoihmUBS10EEramnRIkbTP1DRJFhzb55nvd9ZTsgbkkuSTDZbrQbQktqsAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAEABAAQAEAAgNRrt4LWNjn5I2ZmvsXo6HVEROzvd8fa2tfY3PxkOS0gk81Wq9bQmhYXD2J29vif14rFwVhaGrEkbwFIo7m5oyef/BERs7PHMTd3ZFECQNoUCpexsHD47LmFhcMoFC4tTABIk/n5o1c5iwDQ5CYmLmJs7OrF58fGrmJi4sLiBIA0mJ7+/l9mEACaTDb7GFNT5zXPTU2dRzb7aIECQJKNj19GLlf7Xd9crhrj4z4MFAASbWTk55vMIgA0gYGB3w3M/rJAASDJ+vtvG5j9Y4ECQJJ1d9/VPZvP31mgAJBkXV2VqFYj6vn2R2fnvQUKAEnWyK289nbfGRMAEu3hof6Hu1LJWKAAkGQ3N/X//MPtbc4CBYAku77uqHv26qrDAgWAJDs762xg9p0FCgBJdnLyvu7Z09MPFigAJNnBwcc3mUUAaAK7uz1RqdT+kN/fZ2Jnp8cCBYAke3hoi1Kpr+a5UqmvoVuICABNYn39c80zGxtfLE4ASIPt7d4ol/MvPr+3l4+trV6LEwDSYmVl6FXOIgAkQLncE8vLw8+eW14ejnLZh38CQOqsrg5FsTj45PVicTBWV736p52/Bmtx/htQAAQAvAUABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAQAAAAQAEABAAQACA9PoLHb6Rz3CKyb8AAAAASUVORK5CYII=";
std::string img7 = "iVBORw0KGgoAAAANSUhEUgAAAQAAAADgCAYAAADsQbhQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHABoSwSPvCQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMzSURBVHja7du/SlsBGMbhN8ZYgrVkijZWQUtxqXNG0Ytw8BpcciVZvAYHL0JxzGwXKVXQmmomqQ2hpjQdCp2ylUDMeZ4LOB98h/PjcP6UyuXRKEAhzVkBCAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgBFNm8FxbGy0s/W1mM2N5+yutpPvT5IrfYz1eqvLCz8TpI8P89lMJjP4+Or9HrV3N0t5upqKZeXtdzfL1rijCmVy6ORNcyutbWn7O5202z2sr7+47+OdXPzOp1OPWdnjdzeLlmuADCtGo1+Dg4+Z2fn20SOf37+NsfHH9LtuisQAKbK3t7XHB5+SqUy2VM7HJZydPQxp6fvLP2F8hBwxjSbD2m1LiZ+8SdJpTJKq3WRZvPB4gWAabC//6UQMxEAxtjY+F6ImQgAY1xfvynETASAMU5O3hdiJgLAGJ3Octrt7QyHpYnPGg5Labe30+ksW/wL5TXgjPIdAAKALwERAP7yLwACAPzjISAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAk/MHyjaS2+TzgdgAAAAASUVORK5CYII=";

void error(const char *msg)
{
    perror(msg);
    exit(0);
}

int main(int argc, char *argv[])
{
    int size = 3*256*224;
    int sockfd, n;
    const char *socket_name_;
    struct sockaddr_un serv_addr;
    struct hostent *server;

    srand(time(NULL));
    std::string message;

    char buffer[256];
    if (argc < 2) {
       fprintf(stderr,"usage %s socketpath\n", argv[0]);
       exit(0);
    }
    socket_name_ = argv[1];
    
    bzero(&serv_addr,sizeof(serv_addr));
    serv_addr.sun_family = AF_UNIX;
    strncpy(serv_addr.sun_path,socket_name_,sizeof(serv_addr.sun_path) - 1);

    sockfd = socket(PF_UNIX,SOCK_STREAM,0);
    if (!sockfd) {
        perror("socket");
        exit(-1);
    }

    if (connect(sockfd,(struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0) 
        error("ERROR connecting");
    
    bzero(buffer,256);
    
    int img = 0;
    while (true) {
        n = read(sockfd,buffer,255);
        if (n == 0) continue;
        if (n < 0) 
            error("ERROR reading from socket");
        printf("%s\n",buffer);

        // message = "[";
        // for (int i = 0; i < size; i++)
        // {
        //     int pixel = rand() % 256;
        //     std::stringstream out;
        //     out << pixel;
        //     message += out.str();
        //     if (i != size - 1) {
        //         message += ",";
        //     }
        // }
        // message += "]";

        switch (img % 13) {
            case 0: 
                message = img1;
                break;
            case 1: 
                message = img2;
                break;
            case 2: 
                message = img3;
                break;
            case 3: 
                message = img4;
                break;
            case 4: 
                message = img5;
                break;
            case 5: 
                message = img6;
                break;
            case 6: 
                message = img7;
                break;
            case 7: 
                message = img6;
                break;
            case 8: 
                message = img5;
                break;
            case 9: 
                message = img4;
                break;
            case 10: 
                message = img3;
                break;
            case 11: 
                message = img2;
                break;
            case 12: 
                message = img1;
                break;
        }
        img++;
        n = write(sockfd,message.c_str(),message.size());
        if (n < 0) 
            error("ERROR writing to socket");
        bzero(buffer,256);
    }
    n = read(sockfd,buffer,255);
    if (n < 0) 
         error("ERROR reading from socket");
    printf("%s\n",buffer);

    close(sockfd);
    return 0;
}