## Membership Management Website for Canadian Association for Disabled Skiing

#### How to setup development environment
* [Install activator](https://www.typesafe.com/activator/download)
* [Install node & npm](https://nodejs.org/en/download/)
* [Install gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [Install bower](http://bower.io/#install-bower)
* git clone https://github.com/coska-davisville/project-cads.git
* cd project-cads
* bower install
* activator run
* [Open in browser](http://localhost:9000)

#### Vagrant instruction
* [Install vagrart](https://docs.vagrantup.com/v2/installation/index.html)
* Run following commands
```bash
git clone https://github.com/coska-davisville/project-cads.git
cd project-cads
vagrant up // this could take a while at first time running
vagrant ssh
cd $HOME/sites/cads/
activator run
```
* Open browser
* go to localhost:9000

#### Front-End Dev Instruction

* Make your own folder in public folder first using seed directory (just copy seed to your-folder)
* access URL: localhost:9000/assets/your-folder/index.html
* If the working page doesn't change immediately, do 'activator run' again.



