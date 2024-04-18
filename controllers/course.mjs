import sql from "../database.mjs";
import { pagination } from "../config/pagination.mjs";

//create courses
export const courses = async (req, res) => {
  try {
    await sql`create table if not exists courses(id serial primary key,name text not null,category text not null,level text not null,popularity numeric default 0)`;

    //validation for courses
    const isCoursesExist =
      await sql`select name as available_courses from courses where name=${req.body.name} and level=${req.body.level} and category=${req.body.category}`;

    if (isCoursesExist.length != 0) {
      return res.status(200).json({
        success: false,
        message: "course already existed",
      });
    }
    const columns = ["name", "category", "level"];
    const newCourses = await sql`insert into courses ${sql(req.body, columns)}`;

    return res.status(200).json({
      success: true,
      message: "courses created",
      newCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

//get all courses

export const getAllCourses = async (req, res) => {
  const allCourses = await sql`select * from courses `; //offset 0 rows fetch next 6 rows only

  const page = req.params.page;

  //filters
  if (req.query) {
    const filters = req.query;

    const filtered = allCourses.filter((p) => {
      for (const [key, value] of Object.entries(filters)) {
        if (p[key] !== filters[key]) {
          return;
        }
      }
      return p;
    });

    //sending response
    return res.status(200).json({
      allCourses: pagination(filtered, page, 5),
    });
  }

  return res.status(200).json({
    allCourses: pagination(allCourses, page, 5),
  });
};

//update courses
export const updateCourses = async (req, res) => {
  try {
    //update courses
    const updateCourse =
      await sql`update courses set name=${req.body.name}, category=${req.body.category} ,level=${req.body.level},popularity=${req.body.popularity} where id=${req.body.course_id} returning *`;

    //response
    return res.status(200).json({
      success: true,
      message: "course has been updated",
      updateCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
//delete courses

export const deleteCourses = async (req, res) => {
  try {
    const deleteData =
      await sql`delete from courses where id=${req.body.course_id} returning *`;

    return res.status(200).json({
      success: true,
      deleteData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};
