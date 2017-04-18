container :
	cp ../../user/user-service-mongo.js .
	cp ../../user/user.js .	
	
	sudo docker build -t user .
	sudo docker images | grep user

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name user -e HOST=@eth0 -e BASES=base0:39000,base1:39001 user

rm-single :
	sudo docker service rm user

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean