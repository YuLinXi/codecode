#include <stdio.h>

#define MaxSize 10
#define ElemType int

typedef struct
{
  ElemType data[MaxSize];
  int length;
} SqList;

void InitSqList(SqList &L)
{
  for (int i = 0; i < MaxSize; i++)
  {
    L.data[i] = i;
  }
  L.length = MaxSize;
}
