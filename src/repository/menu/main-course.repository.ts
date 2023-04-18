import { IMainCourse, MainCourse } from "../../models/menu/main-course.model";


class MainCourseRepository {
    getAll() {
        return MainCourse.find({deletedAt:{$exists:false}});
    }

    getById(id: string) {
        return MainCourse.findOne({ _id: id, deletedAt:{$exists:false} });
    }

    create(mainCourse: IMainCourse) {

      return MainCourse.create(mainCourse);
    }

    async update(id: string, mainCourse: Partial<IMainCourse>) {
        const mainCourseToDelete = await this.getById(id)
        
        if(!mainCourseToDelete) {
            throw new Error(`Main course not found`)
        }
        return MainCourse.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: mainCourse });
    }

    async remove(id: string, mainCourse: Partial<IMainCourse>) {
      const mainCourseToDelete = await this.getById(id)
      
      if(!mainCourseToDelete) {
          throw new Error(`Main course not found`)
      }
      return MainCourse.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: mainCourse });
    }
}

export default new MainCourseRepository();