#define MaxSize 10
#define ElemType int

typedef struct
{
  ElemType data[MaxSize];
  int length;
} SqList;

void InitSqList(SqList &L)
{
  L.length = 0;
}

bool ListInsert(SqList &L, int i, ini e) {
  if (i < 1 || i > L.length + 1) {
    return false;
  }
  if (L.length >= MaxSize) {
    return false;
  }
  for (int j = L.length; j >= i; j--) {
    L.data[j] = L.data[j - 1];
  }
  L.data[i - 1] = e;
  L.length++;
  return true;
}

bool ListDelete(SqList &L, int i, int &e) {
  if (i < 1 || i > L.length + 1) {
    return false;
  }
  e = L.data[i - 1];
  for (int j = i - 1; j < L.length - 1; j++)
  {
    L.data[j] = L.data[j + 1];
  }
  L.length--;
  return true;
}

ElemType GetElem(SqList &L, int i) {
  return L.data[i - 1];
}

int Locate(SqList &L, int ElemType e) {
  for (int i = 0; i < L.length; i++) {
    if (L.data[i] == e) {
      return i + 1;
    }
  }
  return 0;
}