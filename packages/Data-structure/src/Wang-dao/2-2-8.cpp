#include <stdio.h>

#define MAX_SIZE 13;
typedef int DataType;

void reverse(DataType L[], int left, int right, int arraySize) {
  int i = (left + right) / 2;
}

void exchange(DataType L[], int m, int n, int size)
{
  reverse(L, 0, m + n - 1, size);
  reverse(L, m - 1, m + n - 1, size);
  reverse(L, 0, m - 1, size);
}

int arr[] = {1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17};

int main () {
  int size = MAX_SIZE;
  exchange(arr, 6, 7, size);
  for (int i = 0; i < size; i++)
  {
    printf("%d\n", arr[i]);
  }
}