#!/usr/bin/env bash

VHOME=/home/vagrant
OPT=$VHOME/opt
PROJECT_HOME=$VHOME/sites/cads
NODE_HOME=$OPT/nodejs/bin
NODE_MODULE=$PROJECT_HOME/node_modules
BOWER_EXE=$NODE_MODULE/bower/bin
SCALA_HOME=$OPT/activator

echo "Creating Dirs"
mkdir -p ${PROJECT_HOME}
sudo apt-get update
#echo "Upgrading system"
#sudo apt-get update && sudo apt-get dist-upgrade -y

echo "Installing programs"
sudo apt-get install vim git git-core g++ wget unzip -y

echo "Installing oracle Java"
sudo echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list
sudo echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys eea14886
sudo echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
sudo apt-get update
sudo apt-get install oracle-java8-installer -y
sudo apt-get install oracle-java8-set-default -y

mkdir ${OPT}
cd ${OPT}

echo "Downloading typesafe activator"
wget https://downloads.typesafe.com/typesafe-activator/1.3.6/typesafe-activator-1.3.6.zip
unzip typesafe-activator-1.3.6.zip && mv activator-dist-1.3.6 activator
rm -rf typesafe-activator-1.3.6.zip

echo "Adding activator path"

echo "Downloading node and npm"
cd ${OPT} && wget https://nodejs.org/dist/v5.1.0/node-v5.1.0-linux-x64.tar.gz && tar -xvzf node-v5.1.0-linux-x64.tar.gz
sudo rm -rf ${OPT}/node-v5.1.0-linux-x64.tar.gz
mv ${OPT}/node-v5.1.0-linux-x64 ${OPT}/nodejs
sudo echo "PATH=\$PATH:\$HOME/opt/activator/:\$HOME/opt/nodejs/bin/" | tee -a /etc/bash.bashrc

export PATH=$PATH:${NODE_HOME}:${SCALA_HOME}
sudo chown -R vagrant:vagrant ${OPT}

sudo apt-get install postgresql -y

sudo su -c "psql -c \"CREATE USER cads WITH PASSWORD 'cads';\"" postgres
sudo su -c "psql -c \"CREATE DATABASE cads;\"" postgres
sudo su -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE cads to cads;\"" postgres
sudo cp -b ${PROJECT_HOME}/postgresql.conf /etc/postgresql/9.4/main/
sudo cp -b ${PROJECT_HOME}/pg_hba.conf /etc/postgresql/9.4/main/
sudo service postgresql restart

sudo echo "export DATABASE_URL=jdbc:postgresql://127.0.0.1:5432/cads" >> /etc/bash.bashrc
sudo echo "export DATABASE_USER=cads" >> /etc/bash.bashrc
sudo echo "export DATABASE_PASSWORD=cads" >> /etc/bash.bashrc

sudo ${NODE_HOME}/npm install -g bower gulp
cd ${PROJECT_HOME} && npm install && bower install
