import sql from "../database.mjs";
import { sendEmail } from "../config/sendEmail.mjs";
import { pagination } from "../config/pagination.mjs";

//for enrollement in courses

export const enrollCourses = async (req, res) => {
  try {
    //check enrollement table exist or not
    await sql`create table if not exists enrollment(id serial primary key,user_id numeric not null REFERENCES register(id) ON DELETE CASCADE ,courses_id numeric not null REFERENCES courses(id) ON DELETE CASCADE,join_date date not null default current_date  )`;

    //validation for enroll courses
    const isEnroll =
      await sql`select courses_id,user_id from enrollment where courses_id = ${req.body.course_id} and user_id= ${req.body.id}`;

    if (isEnroll.length != 0) {
      return res.status(200).json({
        success: false,
        message: "course already taken",
      });
    }

    const columns = ["courses_id", "user_id"];

    const newCoursesEnroll = await sql`insert into enrollment ${sql(
      { courses_id: req.body.course_id, user_id: req.body.id },
      columns
    )}`;

    //find user
    const user = await sql`select email from register where id=${req.body.id} `;

    //sending mail
    sendEmail(user[0].email, "Enrolled New Course", "enroll");
    return res.status(200).json({
      success: true,
      message: "courses enrolled",
      newCoursesEnroll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

export const getAllTakenCourses = async (req, res) => {
  try {
    const page = req.params.page;

    const result =
      await sql`select * from enrollment inner join courses on enrollment.courses_id= courses.id where user_id=${req.body.id}`;

    res.status(200).json({
      allCourses: pagination(result, page, 5),
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
