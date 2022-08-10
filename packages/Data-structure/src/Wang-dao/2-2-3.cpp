#include <stdio.h>
#include "../common/sqlist.cpp"

void delSqllist(SqList &L, ElemType value)
{
  int k = 0, i;
  for (i = 0; i < L.length; i ++) {
    if (L.data[i] != value) {
      L.data[k] = L.data[i];
      k++;
    }
  }
  L.length = k;
}

int main () {
  SqList L;
  InitSqList(L);
  delSqllist(L, 2);
  for (int i = 0; i < L.length; i++)
  {
    printf("%d\n", L.data[i]);
  }
}