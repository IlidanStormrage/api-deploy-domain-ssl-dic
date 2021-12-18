import { getPagination } from "../libs/getPagination";
import Task from "../models/Task";

export const findAllTasks = async (req, res) => {
  try {
    const { size, page, title } = req.query;
    const condition = title
      ? {
          title: { $regex: new RegExp(title), $options: "i" },
        }
      : {};

    const { limit, offset } = getPagination(page, size);

    const data = await Task.paginate(condition, { offset, limit });
    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false,
    });
    const taskSaved = await newTask.save();

    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const findOneTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task)
      return res
        .status(404)
        .json({ message: `La tarea con el id ${id} no existe` });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error con recibir la tarea con el id ${id}`,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    res.json({ message: "La tarea fue eliminada", task });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const findAllDoneTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Tarea fue actualizada", updateTask });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};
