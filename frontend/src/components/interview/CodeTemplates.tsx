export const CODE_TEMPLATES: Record<string, string> = {
  python: `def solve():

    pass


if __name__ == "__main__":
    solve()
`,

  java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

    }

}
`,

  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {

    return 0;
}
`,

  c: `#include <stdio.h>

int main() {

    return 0;
}
`,

  javascript: `function solve() {

}

solve();
`,

  typescript: `function solve(): void {

}

solve();
`,

  go: `package main

import "fmt"

func main() {

}
`,

  rust: `fn main() {

}
`,

  kotlin: `fun main() {

}
`,

  swift: `import Foundation

print("Hello World")
`,

  csharp: `using System;

class Program
{
    static void Main()
    {

    }
}
`,
};