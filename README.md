# PrettyParadiseAdminUi
This project is one of many microservices. This microservice serves the purpose of being a front end to the pretty-paradise-admin microservice. Other microservices and links to their github repositories are listed below:
1. [pretty-paradise-admin](https://github.com/PrettyParadise/pretty-paradise-admin)
2. [pretty-paradise-infrastructure](https://github.com/PrettyParadise/pretty-paradise-infrastructure)
3. [pretty-paradise-bom](https://github.com/PrettyParadise/pretty-paradise-bom)
4. [pretty-paradise-client](https://github.com/PrettyParadise/pretty-paradise-client)

The development branch contains the latest development code, everything explained in the README is relevant to the development branch.

## Starting the Project

This microservice depends on the _pretty_paradise_bom_, _pretty-paradise-admin_ and _pretty-paradise-infrastructure_ microservices.

To get started we need the BOM (Bill of Material) for both the _pretty-paradise-admin_ and _pretty-paradise-infrastructure_ microservices. The BOM exists in the _master_ branch of the _pretty-paradise-bom_ microservice, pull its code and run _mvn install_ in the directory containing the _pom.xml_ file. This will install all necessary dependencies for the microservices onto your local machine

Next, download the latest _development_ branch content on the _pretty-paradise-infrastructure_ microservice. Ensure you have _docker-compose_ installed on your system and navigate to the _docker_ folder and run _docker-compose up_ which will start a MySQL database (to stop the docker containers defined in the _docker-compose.yml_ file, run _docker-compose down_ in the same directory)

Next we need to start our service discovery application (Eureka server). Open the project in your favourite IDE and navigate to the _eureka_server_ sub module. Find and run the main class (_PrettyParadiseEurekaServer_).

Now we are able to start our backend microservice. Download the latest content on the _development_ branch of the _pretty-paradise-admin_ microservice. Launch it by again openeing it up in your favourite IDE and running the main application (_PrettyParadiseAdminApplication_).

Lastly we can launch the front end application (this microservice) for the admin backend microservice. Navigate to the _development_ branch of this microservice and pull the latest content. Navigate to the location of the _package.json_ file and run _npm start_ in a terminal to have the UI started on port 4200. Navigate to _localhost:4200_ in your browser to view the UI.
