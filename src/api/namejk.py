import sys

if __name__ == '__main__':
    an=input() #3
    ans = an.replace("[", "")
    ans2 = ans.replace("]", "")
    nums = [float(n) for n in ans2.split(',')]
    d = []
    for n in nums:
        if not d or n > d[-1]:
            d.append(n)
        else:
            l, r = 0, len(d) - 1
            loc = r
            while l <= r:
                mid = (l + r) // 2
                if d[mid] >= n:
                    loc = mid
                    r = mid - 1
                else:
                    l = mid + 1
            d[loc] = n
    print(len(d))