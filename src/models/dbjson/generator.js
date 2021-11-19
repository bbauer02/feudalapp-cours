let faker = require('faker');
faker.locale = "fr";
let fs = require('fs');

function generateDatas() {
  let historicalRoles = [
    {
      id: 1,
      label: "Intendant"
    },
    {
      id: 2,
      label: "Soldat"
    },
    {
      id: 3,
      label: "Client"
    },
    {
      id: 4,
      label: "Ecuyer"
    },
    {
      id: 5,
      label: "Chevalier"
    }
     ];
  
    let events = [{
      id: 1,
      label:"Guerre Féodale 2022",
      description:"Edition 2022 de Guerre Féodale",
      address: "Dans un coin de la montage",
      price: 80,
      start: "2022-06-01",
      end: "2022-06-03",
      numLimit: 100,
      subDateLimit:"2022-05-30",
      isCancel: false,
      createdAt: "2022-01-01",
      updatedAt: null
    }];
  let characters=[];
  for (let id = 1; id <= 10; id++) {
    let isValid = faker.helpers.randomize([true, false]);
    let role = faker.helpers.randomize(historicalRoles);
    let name = faker.name.firstName();
    if(role.label === "Chevalier")
    name += " de " + faker.address.city();
    let biography = faker.lorem.paragraphs(10);
    let pictures = [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()];
    characters.push({
      id,
      isValid,
      role,
      name,
      biography,
      pictures
    });
  }

  let users = [];
  for (let id = 1; id <= 10; id++) {

    let email = faker.internet.email();
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let roles = faker.helpers.randomize(['USER', 'ADMIN']);
    let association = faker.helpers.randomize(['DGDA', '', 'CDA' , 'Les chevaliers de Trincoux', 'Aquitalis Century 12']);
    let displayname = firstname+"."+lastname;
    let createdAt = faker.date.past(1);
    let is_verified = faker.helpers.randomize([0,1]);
    let birthdate = faker.date.past(30);
    let phone = faker.phone.phoneNumber();
    let emergency_phone = faker.phone.phoneNumber;
    let emergency_contact = faker.name.firstName()+ " " + faker.name.lastName();
    let healthy_troubles = faker.lorem.paragraphs();
    let avatar = faker.internet.avatar();
    let character = characters[id];
    users.push({
      id,
      email,
      firstname,
      lastname,
      roles,
      association,
      displayname,
      createdAt,
      is_verified,
      birthdate,
      phone,
      emergency_phone,
      emergency_contact,
      healthy_troubles,
      avatar,
      characters : character
    });
  }
  let subscriptions = [];
  for (let id = 1; id <= 10; id++) {
    let isPaid = faker.helpers.randomize([true, false]);
    let isValid = faker.helpers.randomize([true, false]);
    let createdAt = faker.date.between("2022-01-01", "2022-05-30");
    let validate = createdAt;
    let paidAt = createdAt;
    subscriptions.push({
      id,
      isPaid,
      isValid,
      createdAt,
      validate,
      paidAt,
      character: id,
      user: id
    })
  }

  return { characters, users, historicalRoles, events, subscriptions};
}
module.exports = generateDatas;

let dataObj = generateDatas();
fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));