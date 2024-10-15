// SnakeGame.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, PanResponder } from 'react-native';

const BOARD_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef(direction);

  directionRef.current = direction;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(moveSnake, 400);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + directionRef.current.x,
        y: prevSnake[0].y + directionRef.current.y,
      };

      // Vérifie les collisions avec les murs
      if (
        newHead.x < 0 ||
        newHead.x >= BOARD_SIZE ||
        newHead.y < 0 ||
        newHead.y >= BOARD_SIZE
      ) {
        gameOver();
        return prevSnake;
      }

      // Vérifie les collisions avec le corps du serpent
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver();
        return prevSnake;
      }

      let newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        // Mange la nourriture
        const newFoodPosition = generateFoodPosition(newSnake);
        setFood(newFoodPosition);
        setScore(prevScore => prevScore + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const generateFoodPosition = (snake: any[]) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  const handleDirectionChange = (newDirection: any) => {
    const oppositeDirection = {
      x: directionRef.current.x * -1,
      y: directionRef.current.y * -1,
    };
    if (newDirection.x === oppositeDirection.x && newDirection.y === oppositeDirection.y) {
      return;
    }
    setDirection(newDirection);
  };

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFoodPosition(INITIAL_SNAKE));
    setDirection(DIRECTIONS.RIGHT);
    setScore(0);
    setIsPlaying(true);
  };

  const gameOver = () => {
    setIsPlaying(false);
    Alert.alert('Game Over', `Votre score est de ${score}`, [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          // Mouvement horizontal
          if (dx > 0 && directionRef.current !== DIRECTIONS.LEFT) {
            handleDirectionChange(DIRECTIONS.RIGHT);
          } else if (dx < 0 && directionRef.current !== DIRECTIONS.RIGHT) {
            handleDirectionChange(DIRECTIONS.LEFT);
          }
        } else {
          // Mouvement vertical
          if (dy > 0 && directionRef.current !== DIRECTIONS.UP) {
            handleDirectionChange(DIRECTIONS.DOWN);
          } else if (dy < 0 && directionRef.current !== DIRECTIONS.DOWN) {
            handleDirectionChange(DIRECTIONS.UP);
          }
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.boardContainer} {...panResponder.panHandlers}>
        <View style={styles.board}>
          {[...Array(BOARD_SIZE)].map((_, row) => (
            <View key={row} style={styles.row}>
              {[...Array(BOARD_SIZE)].map((_, col) => {
                const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
                const isFood = food.x === col && food.y === row;
                return (
                  <View
                    key={col}
                    style={[
                      styles.cell,
                      isSnake ? styles.snakeCell : isFood ? styles.foodCell : styles.emptyCell,
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
      {!isPlaying && (
        <TouchableOpacity onPress={startGame} style={styles.startButton}>
          <Text style={styles.startButtonText}>Démarrer le jeu</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
    backgroundColor: '#333',
  },
  boardContainer: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  snakeCell: {
    backgroundColor: '#00FF00',
  },
  foodCell: {
    backgroundColor: '#FF0000',
  },
  emptyCell: {
    backgroundColor: '#000',
  },
  score: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  startButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SnakeGame;
