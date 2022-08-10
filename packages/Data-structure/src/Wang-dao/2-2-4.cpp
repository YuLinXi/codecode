#include <stdio.h>
#include "../common/sqlist.cpp"

bool delSqllist(SqList &L, ElemType s, ElemType t)
{
  if (s >= t)
    return false;
  if (L.length == 0)
    return false;
  int k = 0, i;
  for (i = 0; i < L.length; i++)
  {
    if (L.data[i] >= t || L.data[i] <= s) {
      L.data[k] = L.data[i];
      k++;
    }
  }
  L.length = k;
}
int main () {
  SqList L;
  InitSqList(L);
  delSqllist(L, 3, 6);
  for (int i = 0; i < L.length; i++)
  {
    printf("%d\n", L.data[i]);
  }
}