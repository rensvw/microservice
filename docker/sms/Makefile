container :
	cp ../../sms/sms-service.js .
	cp ../../sms/sms.js .
	cp ../../sms/config.js .			
	sudo docker build -t sms .
	sudo docker images | grep sms

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name sms -e HOST=@eth0 -e BASES=base0:39000,base1:39001 sms

rm-single :
	sudo docker service rm sms

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean