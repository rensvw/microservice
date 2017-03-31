HOST="127.0.0.1"
BASES="127.0.0.1:39000,127.0.0.1:39001"
OPTS=""

node base/base.js base0 39000 $HOST $BASES $OPTS & sleep 1
node base/base.js base1 39001 $HOST $BASES $OPTS & sleep 1
node monitor/monitor.js $HOST $BASES $OPTS & sleep 1
nodemon api/server.js $HOST $BASES $OPTS & sleep 1
nodemon user/user-service-mongo.js $HOST $BASES $OPTS & sleep 1
nodemon auth/auth-service.js $HOST $BASES $OPTS & sleep 1