import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient()

async function main() {

    const saltOrRounds = 10;
    const password = '123456';
    const hash = await bcrypt.hash(password, saltOrRounds);
    //insert role

    const admin = await prisma.roleUser.upsert({
        where: { id : 1 },
        update: {},
        create: {
          name: 'admin',
        },
    })

    const user = await prisma.roleUser.upsert({
        where: { id : 2 },
        update: {},
        create: {
          name: 'client',
        },
    })


    //insert role user

    const addUser = await prisma.user.upsert({
        where : {email : 'admin@gmail.com'},
        update : {},
        create : {
            name : "admin",
            role_id : 1,
            address : "secret",
            password : hash,
            email : "admin@gmail.com"
            
        }
    })

    console.log(admin, user, addUser);
    
} 

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })