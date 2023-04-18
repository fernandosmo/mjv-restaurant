import { IMainCourse } from '../../models/menu/main-course.model';
import MainCourseRepository from '../../repository/menu/main-course.repository';

class MainCourseService {
    getAllMainCourses() {
        return MainCourseRepository.getAll();
    }

    getMainCourseById(id: string) {
        return MainCourseRepository.getById(id);
    }

    createMainCourse(mainCourse: IMainCourse) {
        return MainCourseRepository.create(mainCourse);
    }
    
    updateMainCourse(id: string, mainCourse: Partial<IMainCourse>) {
      const mainCourseUpdated: Partial<IMainCourse> = {...mainCourse, updatedAt: new Date()}
      return MainCourseRepository.update(id, mainCourseUpdated);
    }

    removeMainCourse(id: string) {
        const mainCourse: Partial<IMainCourse> = {deletedAt: new Date()}
        
        return MainCourseRepository.remove(id, mainCourse);
    }
}

export default new MainCourseService();