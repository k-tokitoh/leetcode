/*
 * @lc app=leetcode id=695 lang=typescript
 *
 * [695] Max Area of Island
 */

// @lc code=start
// カテゴリはgraph

// 訪問済みかどうかは、別の配列で表現するのではなく、2に変更することで表現しちゃうと楽

// DFSは本質的に調べる対象をstackで管理する.
// 再帰で関数呼び出しのスタックを利用することもできるし、別途用意したデータ構造をスタックとして使うこともできる。

// まずはDFS > 再帰
// runtime: beats 93%
// memory: beats 79%
// function maxAreaOfIsland(grid: number[][]): number {
//   // i行j列を始点として、
//   // - 一続きの陸地を全部訪問済み=2に書き換える
//   // - そこから新規で発生された領域のマス数を返す

//   // どれくらい深く探索したのかを返す必要があるので、関数呼び出しでその情報も受け渡す必要がある
//   const dfs = (i: number, j: number): number => {
//     // 新規に発見されたマスの数
//     let foundArea = 0;
//     // もしi行j列が未訪問の陸地なら
//     if (grid[i][j] === 1) {
//       // 訪問済みに変更したうえで
//       grid[i][j] = 2;
//       // 新たに発見された1マスを計上
//       foundArea++;

//       // 上があれば上に行った場合の発見領域を計上
//       if (i > 0) foundArea += dfs(i - 1, j);
//       // 下があれば下に行った場合の発見領域を計上
//       if (i < grid.length - 1) foundArea += dfs(i + 1, j);
//       // 左があれば左に行った場合の発見領域を計上
//       if (j > 0) foundArea += dfs(i, j - 1);
//       // 右があれば右に行った場合の発見領域を計上
//       if (j < grid[0].length - 1) foundArea += dfs(i, j + 1);
//     }
//     return foundArea;
//   };

//   let maxArea = 0;
//   // i行目
//   for (let i = 0; i < grid.length; i++) {
//     // j列目
//     for (let j = 0; j < grid[0].length; j++) {
//       // 陸地の場合
//       if (grid[i][j] === 1) {
//         // i, jを起点として、
//         // - 一続きの陸地を全て訪問済み=2に書き換える
//         // - 最大の領域を更新する
//         maxArea = Math.max(maxArea, dfs(i, j));
//       }
//     }
//   }
//   return maxArea;
// }

// 続いてDFS > スタック
// runtime: beats 18%
// memory: beats 11%
// function maxAreaOfIsland(grid: number[][]): number {
//   // i行j列を始点として、
//   // - 一続きの陸地を全部訪問済み=2に書き換える
//   // - そこから新規で発生された領域のマス数を返す

//   const dfs = (i: number, j: number): number => {
//     const stack: Array<[number, number]> = [[i, j]];

//     // 新規に発見されたマスの数
//     let foundArea = 0;

//     while (true) {
//       // stackから調べる地点を取り出す
//       const point = stack.pop();
//       // stackが空だったらreturn
//       if (point == undefined) return foundArea;

//       const [i, j] = point;
//       // もしi行j列が未訪問の陸地なら
//       if (grid[i][j] === 1) {
//         // 訪問済みに変更したうえで
//         grid[i][j] = 2;
//         // 新たに発見された1マスを計上
//         foundArea++;

//         // 上があれば上を調べる対象に追加する
//         if (i > 0) stack.push([i - 1, j]);
//         // 下があれば下を調べる対象に追加する
//         if (i < grid.length - 1) stack.push([i + 1, j]);
//         // 左があれば左を調べる対象に追加する
//         if (j > 0) stack.push([i, j - 1]);
//         // 右があれば右を調べる対象に追加する
//         if (j < grid[0].length - 1) stack.push([i, j + 1]);
//       }
//     }
//   };

//   let maxArea = 0;
//   // i行目
//   for (let i = 0; i < grid.length; i++) {
//     // j列目
//     for (let j = 0; j < grid[0].length; j++) {
//       // 陸地の場合
//       if (grid[i][j] === 1) {
//         // i, jを起点として、
//         // - 一続きの陸地を全て訪問済み=2に書き換える
//         // - 最大の領域を更新する
//         maxArea = Math.max(maxArea, dfs(i, j));
//       }
//     }
//   }
//   return maxArea;
// }

// 続いてBFS
// BFSは本質的に調べる対象をqueueで管理する
// runtime: beats 33%
// memory: beats 19%
function maxAreaOfIsland(grid: number[][]): number {
  // i行j列を始点として、
  // - 一続きの陸地を全部訪問済み=2に書き換える
  // - そこから新規で発生された領域のマス数を返す

  const bfs = (i: number, j: number): number => {
    const queue: Array<[number, number]> = [[i, j]];

    // 新規に発見されたマスの数
    let foundArea = 0;

    while (true) {
      // queueから調べる地点を取り出す
      const point = queue.shift();
      // queueが空だったらreturn
      if (point == undefined) return foundArea;

      const [i, j] = point;
      // もしi行j列が未訪問の陸地なら
      if (grid[i][j] === 1) {
        // 訪問済みに変更したうえで
        grid[i][j] = 2;
        // 新たに発見された1マスを計上
        foundArea++;

        // 上があれば上を調べる対象に追加する
        if (i > 0) queue.push([i - 1, j]);
        // 下があれば下を調べる対象に追加する
        if (i < grid.length - 1) queue.push([i + 1, j]);
        // 左があれば左を調べる対象に追加する
        if (j > 0) queue.push([i, j - 1]);
        // 右があれば右を調べる対象に追加する
        if (j < grid[0].length - 1) queue.push([i, j + 1]);
      }
    }
  };

  let maxArea = 0;
  // i行目
  for (let i = 0; i < grid.length; i++) {
    // j列目
    for (let j = 0; j < grid[0].length; j++) {
      // 陸地の場合
      if (grid[i][j] === 1) {
        // i, jを起点として、
        // - 一続きの陸地を全て訪問済み=2に書き換える
        // - 最大の領域を更新する
        maxArea = Math.max(maxArea, bfs(i, j));
      }
    }
  }
  return maxArea;
}

// @lc code=end
