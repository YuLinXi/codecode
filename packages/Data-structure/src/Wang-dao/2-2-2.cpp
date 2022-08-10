#include <stdio.h>
#include "../common/sqlist.cpp"

void ConvertSqList (SqList &L) {
  ElemType temp;
  for (int i = 0; i < L.length / 2; i ++) {
    temp = L.data[i];
    L.data[i] = L.data[L.length - 1 - i];
    L.data[L.length - 1 - i] = temp;
  }
}

int main()
{
  SqList L;
  InitSqList(L);
  ConvertSqList(L);
  for (int i = 0; i < L.length; i++)
  {
    printf("%d\n", L.data[i]);
  }
}