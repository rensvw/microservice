module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
    name        : "base0",
    script      : "./base/base.js",
    watch       : './base',
    env: {
      "NODE_ENV": "development",
      "PORT"  : 39000
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },
  {
    name        : "base1",
    script      : "./base/base.js",
    watch       : './base',
    env: {
      "NODE_ENV": "development",
      "PORT"  : 39001
    },
    env_production : {
       "NODE_ENV": "production"
    }
    },
    // First application
    {
    name        : "api",
    script      : "./api/server.js",
    watch       : './api',
    env: {
      "NODE_ENV": "development",
      
    },
    env_production : {
       "NODE_ENV": "production"
    }

  },
    // First application
    {
    name        : "auth",
    script      : "./auth/auth-service.js",
    watch       : './auth',
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }

  },
    // First application
    {
    name        : "user",
    script      : "./user/user-service-mongo.js",
    watch       : './user',
    env: {
      "NODE_ENV": "development",
      
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },
    // First application
    {
    name        : "sms",
    script      : "./sms/sms-service.js",
    watch       : './sms',
    env: {
      "NODE_ENV": "development",
      
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },
    // First application
    {
    name        : "email",
    script      : "./email/email-service.js",
    watch       : './email',
    env: {
      "NODE_ENV": "development",
      
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }
    
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
