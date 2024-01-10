import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy Coke', createdAt: new Date() },
    { id: 3, text: 'Study math', createdAt: new Date() },
    { id: 4, text: 'Go to GYM', createdAt: new Date() }
]


export class TodosControllers {

    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }

    public getOne = (req: Request, res: Response) => {
        const id = +req.params.id //el signo '+' transforma el string en INT
        const todo = todos.find((todo) => todo.id === id)
        if (todo) {
            res.json(todo)
        }
        res.status(404).json({ error: `TODO with id ${id} NOT FOUND` })
    }

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) return res.status(404).json({ error: `Text property is required` })
        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: new Date()
        }
        todos.push(newTodo)
        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id //el signo '+' transforma el string en INT
        const todo = todos.find((todo) => todo.id === id)
        if (!todo) return res.status(404).json({ error: `Id ${id} not found` })


        const {text} = req.body
        todo.text = text || todo.text
        
        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id //el signo '+' transforma el string en INT
        const todo = todos.find((todo) => todo.id === id)
        if (!todo) return res.status(404).json({ error: `Id ${id} not found` })
        
        todos.splice(todos.indexOf(todo), 1)

        res.json(todo)
    }
}