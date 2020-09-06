import { db } from '../models/index.js';
import {gradeModel} from '../models/gradeModel.js'
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {
    const grade = new gradeModel(req.body);
    await grade.save();
    //res.send(grade);
    res.send({ message: 'Grade created sucessfully!' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    logger.info(`GET /grade ${name? "name: " + name: "all"}`);
    const grade = await gradeModel.find(condition);        
    res.send(grade);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Error listing all grades!' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`GET /grade - ${id}`);
    const grade = await gradeModel.find({_id:id});        
    if (grade.length) res.send(grade);
    else res.status(404).send(`Grade with id ${id} not found!`)
  } catch (error) {
    res.status(500).send({ message: 'Error finding id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'No data supplied for update',
    });
    return;
  }

  const id = req.params.id;

  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    const options = { new: true };
    const grade = await gradeModel.findByIdAndUpdate(id, req.body, options);        
    // if (grade) res.send(grade);
    if (grade) res.send({ message: 'Grade updated sucessfully!' });
    else res.status(404).send(`Grade with id ${id} not found!`);
  } catch (error) {
    res.status(500).send({ message: 'Error updating grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`DELETE /grade - ${id}`);
    const grade = await gradeModel.findByIdAndRemove(id);        
    // if (grade) res.send(grade);
    if (grade) res.send({ message: 'Grade removed sucessfully!' });

    else res.status(404).send(`Grade with id ${id} not found!`);

  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error deleting Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE ALL /grade`);
    const grade = await gradeModel.deleteMany({});        
    if (grade) res.send({ message: 'All grades removed sucessfully!' });
    
  } catch (error) {
    res.status(500).send({ message: 'Error removing all Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
