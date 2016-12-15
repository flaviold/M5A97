CXX=		g++ $(CCFLAGS)

OBJS=		gameUnix.o webadapter.o base64.o

INCLUDES=	`pkg-config --cflags opencv`

LIBS=		`pkg-config --libs opencv`

CCFLAGS= 	-g

all:$(OBJS)
	$(CXX) $(INCLUDES) -o gameUnix $(OBJS) $(LIBS)

clean:
	rm -f $(OBJS) $(OBJS:.o=.d)

realclean:
	rm -f $(OBJS) $(OBJS:.o=.d) server client
