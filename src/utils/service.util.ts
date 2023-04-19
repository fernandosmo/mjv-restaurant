import dessertService from "../services/menu/dessert.service";
import drinkService from "../services/menu/drink.service";
import mainCourseService from "../services/menu/main-course.service";
import saladService from "../services/menu/salad.service";
import starterService from "../services/menu/starter.service";
import wineService from "../services/menu/wine.service";

export const getItemPrice = async (id: string) => {
  if(await dessertService.getDessertById(id)){
    const dessert = await dessertService.getDessertById(id);
    return dessert!.price;
  }
  else if(await drinkService.getDrinkById(id)){
    const drink = await drinkService.getDrinkById(id);
    return drink!.price;
  }
  else if(await mainCourseService.getMainCourseById(id)){
    const mainCourse = await mainCourseService.getMainCourseById(id);
    return mainCourse!.price;
  }
  else if(await saladService.getSaladById(id)){
    const salad = await saladService.getSaladById(id);
    return salad!.price;
  }
  else if(await starterService.getStarterById(id)){
    const starter = await starterService.getStarterById(id);
    return starter!.price;
  }
  else if(await wineService.getWineById(id)){
    const wine = await wineService.getWineById(id);
    return wine!.price;
  }
  else {
    throw new Error('Item not found');
  }
}