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

* git checkout -b \<branch name\>
* modify source code
* git checkout master
* git merge \<branch name\>
* git branch -d \<branch name\>

#### [JavaScript Test Instruction](HOWTOTESTJAVASCRIPT.md)

#### Gulp Instruction
* Build - `public/dist` directory will be created and new production files will be put into the directory
```sh
$ gulp build
```
* Test
```sh
$ gulp test
```

#### Useful Github References
* [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)
