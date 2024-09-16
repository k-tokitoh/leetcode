/*
 * @lc app=leetcode id=703 lang=typescript
 *
 * [703] Kth Largest Element in a Stream
 */

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// @lc code=start

// カテゴリはheap, priority queue

// シンプルに毎回sortしてみるとtime limit exceeded
// class KthLargest {
//   constructor(private readonly k: number, private nums: number[]) {}

//   add(val: number): number {
//     this.nums = [...this.nums, val].sort((a, b) => Number(a) - Number(b));
//     return this.nums[this.nums.length - this.k];
//   }
// }

// 優先度付きキューはインターフェース
// キューで要素を追加できる、内部的に常に優先度maxな要素が特定された状態であり、優先度が最大の要素を取り出せる（多くの実装ではO(1)）

// そのためにheap木という論理構造を利用する
// heap木は、優先度がchild < parentである木構造
// 全ての要素がsortされているわけではない
// なのでわりと緩めの条件で雑多に積み上げられたイメージからheapという名前がついている
// 要素の追加は、leafを一番下に追加して、順次親と比較してswapする O(logN)
// 最優先要素の取得後は、一番下の要素をrootに持ってきて、順次子と比較してswapする O(logN)

// heap木の実装としては配列をつかうのが一般的
// 階層をどんどん要素として追加していく
// indexを倍にして1足すと左の子、2足すと右の子になる。親は逆の操作で求められる

// 証明
// 一般に深さ0始まりN, 左から0始まりM個目の要素のindexは 2^N +M
// いま親を深さ0始まりn, 左から0始まりm個目とする。
// 上記に代入して親のindexは 2^n +m これをPとする
// その左の子は深さn+1, 左から0始まり2m+1個目の要素となる。
// そのindexは上記に代入して 2^(n+1) + 2m + 1
// 変形すると 2(2^n + m) + 1 = 2P + 1
// 左の子も同様

// https://qiita.com/birdwatcher/items/9e6dac869dea023bf53c#priority_queue-%E5%84%AA%E5%85%88%E5%BA%A6%E4%BB%98%E3%81%8D%E3%82%AD%E3%83%A5%E3%83%BC

// この問題ではk番目に大きい要素を取得したい
// なので、大きい方からk番目の要素までを最小heapで保持しておく
// 新たに追加された要素がk番目に大きい要素より小さければ、その後の振る舞いには影響しないのでスルーする
// なるほどなあ...

// 今回は「取り除く&入れる（順不同）したうえでbubbleする」が必要
// 常に完全であることを担保しようとすると「取り除いたらbubbleする」「入れたらbubbleする」なので、
// 「取り除いてbubbleする&入れてbubbleする（順不同）」になってしまい、非効率
// rootを入れ替えてbubble down, にすれば1回で済む（popAndAdd）

class KthLargest {
  constructor(private readonly k: number, nums: number[]) {
    nums.forEach((n) => this.add(n));
  }

  private readonly heap = new MinHeap();

  // 追加した後の時点で大きい方からk番目の要素を返す
  add(val: number): number {
    if (this.heap.size < this.k) {
      // いっぱいでなければ直ちにaddする
      this.heap.add(val);
    } else if (val > this.heap.top) {
      // いっぱいであって、かつ、入れる必要がある=topより大きい場合は、popAndAddする
      this.heap.popAndAdd(val);
    }

    return this.heap.top;
  }
}

class MinHeap {
  private arr: number[] = [];

  get size(): number {
    return this.arr.length;
  }

  add(val: number): void {
    this.arr.push(val);
    this.bubbleUp(this.arr.length - 1);
  }

  // 副作用なし
  get top(): number {
    return this.arr[0];
  }

  popAndAdd(val: number): number {
    const ret = this.top;
    this.arr[0] = val;
    this.bubbleDown(0);
    return ret;
  }

  // 指定したindexの要素をbubble upする
  private bubbleUp(i: number): void {
    // 親が存在して、親より大きければswapする
    let parentIndex = this.parentIndex(i);
    // console.log({ i, parentIndex });
    if (parentIndex != undefined && this.arr[i] < this.arr[parentIndex]) {
      this.swap(i, parentIndex);
      this.bubbleUp(parentIndex);
      // 親が存在して、親より大きければswapする
    }
  }

  // 指定したindexの要素をbubble downする
  private bubbleDown(i: number): void {
    // 左右の子のうち大きい方と比較して、大きい方が自分より大きければswapする
    const leftIndex = this.leftIndex(i);
    const rightIndex = this.rightIndex(i);

    const left = this.arr[leftIndex] ?? Infinity;
    const right = this.arr[rightIndex] ?? Infinity;

    // 左右の子のうち小さい方
    const [min, minIndex] =
      left < right ? [left, leftIndex] : [right, rightIndex];
    if (min < this.arr[i]) {
      this.swap(i, minIndex);
      this.bubbleDown(minIndex);
    }
  }

  // 指定したindexの要素の親のindexを返す
  private parentIndex(i: number): number | undefined {
    // 自身がrootなら親が存在しないのでundefinedを返す
    if (i === 0) return undefined;

    return Math.floor((i - 1) / 2);
  }

  // 指定したindexの要素の左の子のindexを返す
  private leftIndex(i: number): number {
    return 2 * i + 1;
  }

  // 指定したindexの要素の右の子のindexを返す
  private rightIndex(i: number): number {
    return 2 * i + 2;
  }

  // 指定したindexの要素をswapする
  private swap(i: number, j: number): void {
    const tmp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = tmp;
  }
}

// @lc code=end
