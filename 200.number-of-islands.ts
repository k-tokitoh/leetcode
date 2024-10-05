/*
 * @lc app=leetcode id=200 lang=typescript
 *
 * [200] Number of Islands
 */

// @lc code=start
// カテゴリはgraph

// 訪問済みかどうかは、別の配列で表現するのではなく、2に変更することで表現しちゃうと楽

// DFSは本質的に調べる対象をstackで管理する.
// 再帰で関数呼び出しのスタックを利用することもできるし、別途用意したデータ構造をスタックとして使うこともできる。

// まずはDFS > 再帰
// runtime: beats 87%
// memory: beats 84%
// function numIslands(grid: string[][]): number {
//   // i行j列を始点として、一続きの陸地を全部訪問済み=2に書き換える
//   const dfs = (i: number, j: number) => {
//     // もしi行j列が未訪問の陸地なら
//     if (grid[i][j] === "1") {
//       // 訪問済みに変更したうえで
//       grid[i][j] = "2";
//       // 上があれば上を調べる
//       if (i > 0) dfs(i - 1, j);
//       // 下があれば下を調べる
//       if (i < grid.length - 1) dfs(i + 1, j);
//       // 左があれば左を調べる
//       if (j > 0) dfs(i, j - 1);
//       // 右があれば右を調べる
//       if (j < grid[0].length - 1) dfs(i, j + 1);
//     }
//   };

//   let lands = 0;
//   // i行目
//   for (let i = 0; i < grid.length; i++) {
//     // j列目
//     for (let j = 0; j < grid[0].length; j++) {
//       // 陸地の場合
//       if (grid[i][j] === "1") {
//         // 陸地の数をカウントアップ
//         lands++;
//         // i, jを起点として、一続きの陸地を全て訪問済み=2に書き換える
//         dfs(i, j);
//       }
//     }
//   }
//   return lands;
// }

// 続いてDFS > スタック
// runtime: beats 39%
// memory: beats 26%
// function numIslands(grid: string[][]): number {
//   let lands = 0;

//   // i行j列を始点として、一続きの陸地を全部訪問済み=2に書き換える
//   const dfs = (i: number, j: number) => {
//     // 調べるべき地点(i, j)をstackに入れたり取り出したりする
//     const stack: Array<[number, number]> = [[i, j]];

//     while (true) {
//       // stackから調べる地点を取り出す
//       const point = stack.pop();
//       // stackが空だったらreturn
//       if (point == undefined) return;
//       const [i, j] = point;
//       // もしi行j列が未訪問の陸地なら
//       if (grid[i][j] === "1") {
//         // 訪問済みに変更したうえで
//         grid[i][j] = "2";
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

//   // i行目
//   for (let i = 0; i < grid.length; i++) {
//     // j列目
//     for (let j = 0; j < grid[0].length; j++) {
//       // 陸地の場合
//       if (grid[i][j] === "1") {
//         // 陸地の数をカウントアップ
//         lands++;
//         // i, jを起点として、一続きの陸地を全て訪問済み=2に書き換える
//         dfs(i, j);
//       }
//     }
//   }
//   return lands;
// }

// 続いてBFS
// BFSは本質的に調べる対象をqueueで管理する
// runtime: beats 41%
// memory: beats 45%
function numIslands(grid: string[][]): number {
  let lands = 0;

  // i行j列を始点として、一続きの陸地を全部訪問済み=2に書き換える
  const bfs = (i: number, j: number) => {
    // 調べるべき地点(i, j)をstackに入れたり取り出したりする
    const queue: Array<[number, number]> = [[i, j]];

    while (true) {
      // queueから調べる地点を取り出す
      const point = queue.shift();
      // queueが空だったらreturn
      if (point == undefined) return;
      const [i, j] = point;
      // もしi行j列が未訪問の陸地なら
      if (grid[i][j] === "1") {
        // 訪問済みに変更したうえで
        grid[i][j] = "2";
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

  // i行目
  for (let i = 0; i < grid.length; i++) {
    // j列目
    for (let j = 0; j < grid[0].length; j++) {
      // 陸地の場合
      if (grid[i][j] === "1") {
        // 陸地の数をカウントアップ
        lands++;
        // i, jを起点として、一続きの陸地を全て訪問済み=2に書き換える
        bfs(i, j);
      }
    }
  }
  return lands;
}

// @lc code=end
