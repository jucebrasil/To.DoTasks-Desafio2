
import React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Tasks {
  id: number;
  title: string;
  done: boolean;
}

export type EditTextArgs = {
  taskId: number;
  taskNewTitle: string;

}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if (taskWithSameTitle)
      return Alert.alert('Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome')

    const newTasks = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTasks]);

  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeMarkedAsDone = updatedTasks.find(item => item.id === id);

    if (!taskToBeMarkedAsDone)
      return;

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;//sempre deve retornar false
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover item',
      'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'

      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id);

          setTasks(updatedTasks);
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTextArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId);

    if (!taskToBeUpdated)//verifica se o title existe
      return;
    taskToBeUpdated.title = taskNewTitle;// se houver um novo title, cria um novo
    setTasks(updatedTasks);//atualiza o estado do title
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  }

});