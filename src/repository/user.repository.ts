import { SequencyEmployerCode } from '../models/employer-code-seq.model';
import { IUser, User } from '../models/user.model';

class UserRepository {
    getAll() {
        return User.find({deletedAt:{$exists:false}});
    }

    getByEmployerCode(employerCode: number) {
        return User.findOne({ employerCode, deletedAt:{$exists:false} });
    }

    async create(user: IUser) {
      const employerCodeSeq: any = await SequencyEmployerCode.findOne()
      
      if (!employerCodeSeq) {
        SequencyEmployerCode.create({seq:1})

        const userToCreate = {...user, employerCode: 1}
      
        return User.create(userToCreate);
      }
      const employerCode = employerCodeSeq!.seq + 1

      SequencyEmployerCode.updateOne((employerCodeSeq!.id), employerCode )

      const userToCreate = {...user, employerCode: employerCode}
      
      return User.create(userToCreate);
    }

    async update(employerCode: number, user: Partial<IUser>) {
        const userToDelete = await this.getByEmployerCode(employerCode)
        
        if(!userToDelete) {
            throw new Error(`User doesn't exist`)
        }
        return User.updateOne({ employerCode, deletedAt:{$exists:false} }, { $set: user });
    }

    async remove(employerCode: number, user: Partial<IUser>) {
      const userToDelete = await this.getByEmployerCode(employerCode)
      
      if(!userToDelete) {
          throw new Error(`User doesn't exist`)
      }
      return User.updateOne({ employerCode, deletedAt:{$exists:false} }, { $set: user });
    }
}

export default new UserRepository();